import nested_admin
from django.contrib import admin
from .models import *

admin.site.register(Designer)
admin.site.register(MafStyle)
admin.site.register(MafType)
admin.site.register(Maf)


class RoomInline(nested_admin.NestedTabularInline):
    model = Room
    extra = 1


class FloorInline(nested_admin.NestedStackedInline):
    model = Floor
    inlines = [RoomInline]
    extra = 1


class HouseImageInline(nested_admin.NestedTabularInline):
    model = HouseImage
    extra = 1


@admin.register(House)
class HouseAdmin(nested_admin.NestedModelAdmin):
    inlines = [HouseImageInline, FloorInline]
    list_display = ("name", "price", "status")
    search_fields = ("name",)
    list_filter = ("status",)
