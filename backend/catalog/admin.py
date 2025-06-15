import nested_admin
from django.contrib import admin
from django.utils.html import format_html
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


class ApplicationHouseInline(admin.TabularInline):
    model = ApplicationHouse
    extra = 0
    can_delete = False
    readonly_fields = ("house", "amount", "house_link")
    fields = ("house_link", "amount")

    def has_add_permission(self, request, obj=None):
        return False

    def house_link(self, obj):
        if obj.house_id:
            url = f"/admin/catalog/house/{obj.house_id}/change/"
            return format_html('<a href="{}" target="_blank">{}</a>', url, obj.house.name)
        return "-"
    house_link.short_description = "Дом"


class ApplicationMafInline(admin.TabularInline):
    model = ApplicationMaf
    extra = 0
    can_delete = False
    readonly_fields = ("maf", "amount", "maf_link")
    fields = ("maf_link", "amount")

    def has_add_permission(self, request, obj=None):
        return False

    def maf_link(self, obj):
        if obj.maf_id:
            url = f"/admin/catalog/maf/{obj.maf_id}/change/"
            return format_html('<a href="{}" target="_blank">{}</a>', url, obj.maf.name)
        return "-"
    maf_link.short_description = "МАФ"


# @admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("id", "full_name", "contact", "is_processed")
    list_filter = ("is_processed",)
    search_fields = ("full_name", "contact")
    search_help_text = "Поиск по имени заказчика или тел/email"
    ordering = ("-created_at",)

    readonly_fields = ("created_at",)
    fields = ("full_name", "contact", "created_at", "is_processed")

    inlines = [ApplicationHouseInline, ApplicationMafInline]
