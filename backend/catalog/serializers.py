from rest_framework import serializers
from .models import *


class DesignerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designer
        fields = '__all__'


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class FloorSerializer(serializers.ModelSerializer):
    rooms = RoomSerializer(many=True, read_only=True)

    class Meta:
        model = Floor
        fields = '__all__'
        read_only_fields = ['rooms']


class HouseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseImage
        fields = '__all__'


class HouseFileSerializer(serializers.ModelSerializer):
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = HouseFile
        fields = ["id", "original_filename", "mime_type", "uploaded_at", "download_url"]
    def validate(self, data):
            # Ensure the file name ends with .pdf (case-insensitive)
            filename = data.get("original_filename", "")
            if not filename.lower().endswith(".pdf"):
                raise serializers.ValidationError("Only PDF files are allowed (filename must end with .pdf).")
            # Ensure the mime type is correct
            mime = data.get("mime_type", "")
            if mime and mime != "application/pdf":
                raise serializers.ValidationError("Mime type must be application/pdf.")
            return data

    def get_download_url(self, obj):
        from urllib.parse import quote
        filename = obj.original_filename or "file.pdf"
        ascii_filename = filename.encode('ascii', 'ignore').decode('ascii') or "file.pdf"
        utf8_filename = quote(filename)
        return f"https://yourapi.com/api/house-files/{obj.pk}/download/?filename={utf8_filename}"
    # def get_download_url(self, obj):
    #     return f"https://drive.google.com/uc?export=download&id={obj.drive_file_id}"


class HouseSerializer(serializers.ModelSerializer):
    images = HouseImageSerializer(many=True, read_only=True)
    floors = FloorSerializer(many=True, read_only=True)
    designer = DesignerSerializer(read_only=True)
    files = HouseFileSerializer(many=True, read_only=True)
    stl_file = serializers.SerializerMethodField()

    class Meta:
        model = House
        fields = '__all__'
        read_only_fields = ['images', 'floors', 'designer', 'files', 'created_at', 'updated_at']

    def get_stl_file(self, obj):
        if obj.stl_file:
            return obj.stl_file.url
        return None

class HouseCoordsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = ["stl_coordinates"]

class MafStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MafStyle
        fields = '__all__'


class MafTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MafType
        fields = '__all__'

class MafFileSerializer(serializers.ModelSerializer):
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = MafFile
        fields = ["id", "original_filename", "mime_type", "uploaded_at", "download_url"]

    def validate(self, data):
        filename = data.get("original_filename", "")
        if not filename.lower().endswith(".pdf"):
            raise serializers.ValidationError("Only PDF files are allowed (filename must end with .pdf).")
        mime = data.get("mime_type", "")
        if mime and mime != "application/pdf":
            raise serializers.ValidationError("Mime type must be application/pdf.")
        return data

    def get_download_url(self, obj):
        from urllib.parse import quote
        filename = obj.original_filename or "file.pdf"
        ascii_filename = filename.encode('ascii', 'ignore').decode('ascii') or "file.pdf"
        utf8_filename = quote(filename)
        return f"https://yourapi.com/api/maf-files/{obj.pk}/download/?filename={utf8_filename}"


class MafImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MafImage
        fields = '__all__'

class MafSerializer(serializers.ModelSerializer):
    designer = DesignerSerializer(read_only=True)
    style = MafStyleSerializer(read_only=True)
    type = MafTypeSerializer(read_only=True)
    images = MafImageSerializer(many=True, read_only=True)
    files = MafFileSerializer(many=True, read_only=True)
    stl_file = serializers.SerializerMethodField()

    class Meta:
        model = Maf
        fields = '__all__'
        read_only_fields = ['designer', 'style', 'type', 'images', 'images', 'files', 'created_at', 'updated_at']

    def get_stl_file(self, obj):
        if obj.stl_file:
            return obj.stl_file.url
        return None

class MafCoordsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maf
        fields = ["stl_coordinates"]


class CartItemSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    amount = serializers.IntegerField(min_value=1, default=1)
    item_type = serializers.ChoiceField(choices=["house", "maf"])


class ApplicationSerializer(serializers.ModelSerializer):
    cart = CartItemSerializer(many=True)

    class Meta:
        model = Application
        fields = ["full_name", "contact", "cart"]

    def create(self, validated_data):
        cart = validated_data.pop("cart", [])
        application = Application.objects.create(**validated_data)

        for item in cart:
            item_type = item["item_type"]
            item_id = item["id"]
            amount = item.get("amount", 1)

            if item_type == "house":
                try:
                    house = House.objects.get(id=item_id)
                    ApplicationHouse.objects.create(
                        application=application, house=house, amount=amount
                    )
                except House.DoesNotExist:
                    continue
            elif item_type == "maf":
                try:
                    maf = Maf.objects.get(id=item_id)
                    ApplicationMaf.objects.create(
                        application=application, maf=maf, amount=amount
                    )
                except Maf.DoesNotExist:
                    continue

        return application

