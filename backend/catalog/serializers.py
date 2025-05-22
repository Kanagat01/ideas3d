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
