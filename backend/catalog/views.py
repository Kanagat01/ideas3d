from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *


class CatalogView(APIView):
    def get(self, request, *args, **kwargs):
        houses = House.objects.prefetch_related(
            'images', 'floors__rooms', 'designer').all()
        mafs = Maf.objects.prefetch_related(
            'designer', 'style', 'type').all()

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
