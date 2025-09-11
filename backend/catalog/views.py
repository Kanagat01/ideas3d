from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.http import StreamingHttpResponse, Http404, HttpResponseRedirect
from .utils.yandex import get_yandex_disk_download_url
from django.shortcuts import get_object_or_404
import io
import zipfile
import requests
from django.utils.text import slugify
from rest_framework.generics import UpdateAPIView


class CatalogView(APIView):
    def get(self, request, *args, **kwargs):
        """
        Optional query param:
        - updated_since=YYYY-MM-DDTHH:MM:SSZ → return only items updated after this date
        GET /api/catalog/?updated_since=2025-08-01T00:00:00Z

        """
        updated_since_str = request.query_params.get("updated_since")
        updated_since = None
        if updated_since_str:
            parsed = parse_datetime(updated_since_str)
            if parsed:
                updated_since = make_aware(parsed) if parsed.tzinfo is None else parsed

        houses = House.objects.prefetch_related(
            'images', 'floors__rooms', 'designer').all()
        mafs = Maf.objects.prefetch_related(
            'designer', 'style', 'type', 'images').all()

        styles = MafStyle.objects.all()
        types = MafType.objects.all()
        designers = Designer.objects.all()

        house_serializer = HouseSerializer(houses, many=True)
        maf_serializer = MafSerializer(mafs, many=True)
        style_serializer = MafStyleSerializer(styles, many=True)
        type_serializer = MafTypeSerializer(types, many=True)
        designer_serializer = DesignerSerializer(designers, many=True)

        return Response({
            "houses": house_serializer.data,
            "mafs": maf_serializer.data,
            "styles": style_serializer.data,
            "types": type_serializer.data,
            "designers": designer_serializer.data
        })

class ApplicationCreateView(APIView):
    def post(self, request):
        serializer = ApplicationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response({"message": "Заявка успешно создана"}, status=status.HTTP_201_CREATED)

class HouseFileDirectDownloadView(APIView):
    def get(self, request, pk):
        file = get_object_or_404(HouseFile, pk=pk)
        if not file.yandex_disk_link:
            raise Http404("No Yandex Disk link available.")

        try:
            download_url = get_yandex_disk_download_url(file.yandex_disk_link)
        except Exception as e:
            raise Http404(f"Could not fetch Yandex Disk download URL: {e}")

        return HttpResponseRedirect(download_url)

class MafFileDirectDownloadView(APIView):
    def get(self, request, pk):
        file = get_object_or_404(MafFile, pk=pk)
        if not file.yandex_disk_link:
            raise Http404("No Yandex Disk link available.")

        try:
            download_url = get_yandex_disk_download_url(file.yandex_disk_link)
        except Exception as e:
            raise Http404(f"Could not fetch Yandex Disk download URL: {e}")

        return HttpResponseRedirect(download_url)

class HouseFilesZipDownloadView(APIView):
    def get(self, request, house_id, format=None):
        house = get_object_or_404(House, pk=house_id)
        files = house.files.all()

        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
            for file in files:
                if not file.yandex_disk_link:
                    continue
                try:
                    download_url = get_yandex_disk_download_url(file.yandex_disk_link)
                    file_resp = requests.get(download_url, timeout=15)
                    file_resp.raise_for_status()
                    arcname = f"{file.id}_{slugify(file.original_filename or f'file_{file.pk}.pdf')}"
                    zf.writestr(arcname, file_resp.content)
                except Exception:
                    continue

        zip_buffer.seek(0)
        response = StreamingHttpResponse(zip_buffer, content_type='application/zip')
        response['Content-Disposition'] = (
            f'attachment; filename="{slugify(house.name)}_files.zip"'
        )
        return response

class MafFilesZipDownloadView(APIView):
    def get(self, request, maf_id, format=None):
        maf = get_object_or_404(Maf, pk=maf_id)
        files = maf.files.all()

        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
            for file in files:
                if not file.yandex_disk_link:
                    continue
                try:
                    download_url = get_yandex_disk_download_url(file.yandex_disk_link)
                    file_resp = requests.get(download_url, timeout=15)
                    file_resp.raise_for_status()
                    arcname = f"{file.id}_{slugify(file.original_filename or f'file_{file.pk}.pdf')}"
                    zf.writestr(arcname, file_resp.content)
                except Exception:
                    continue

        zip_buffer.seek(0)
        response = StreamingHttpResponse(zip_buffer, content_type='application/zip')
        response['Content-Disposition'] = (
            f'attachment; filename="{slugify(maf.name)}_files.zip"'
        )
        return response


from .serializers import MafCoordsUpdateSerializer


class MafUpdateCoordsView(UpdateAPIView):
    queryset = Maf.objects.all()
    serializer_class = MafCoordsUpdateSerializer




from .serializers import HouseCoordsUpdateSerializer

class HouseUpdateCoordsView(UpdateAPIView):
    queryset = House.objects.all()
    serializer_class = HouseCoordsUpdateSerializer
