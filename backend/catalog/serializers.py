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


class HouseSerializer(serializers.ModelSerializer):
    images = HouseImageSerializer(many=True, read_only=True)
    floors = FloorSerializer(many=True, read_only=True)
    designer = DesignerSerializer(read_only=True)

    class Meta:
        model = House
        fields = '__all__'
        read_only_fields = ['images', 'floors', 'designer']


class MafStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MafStyle
        fields = '__all__'


class MafTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MafType
        fields = '__all__'


class MafSerializer(serializers.ModelSerializer):
    designer = DesignerSerializer(read_only=True)
    style = MafStyleSerializer(read_only=True)
    type = MafTypeSerializer(read_only=True)

    class Meta:
        model = Maf
        fields = '__all__'
        read_only_fields = ['designer', 'style', 'type']


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
