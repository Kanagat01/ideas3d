# pyright: reportUnknownMemberType=false, reportUnknownArgumentType=false

from django.urls import path
from catalog.views import *

urlpatterns = [
    path('catalog/', CatalogView.as_view(), name='catalog'),
    path('create-application/', ApplicationCreateView.as_view(),
         name='create_application'),
    path('house-files/<int:pk>/download/', HouseFileDirectDownloadView.as_view(), name='housefile_download'),
    path('houses/<int:house_id>/download-files/', HouseFilesZipDownloadView.as_view(), name='housefiles_zip_download'),

    path('maf-files/<int:pk>/download/', MafFileDirectDownloadView.as_view(), name='maffile_download'),
    path('mafs/<int:maf_id>/download-files/', MafFilesZipDownloadView.as_view(), name='maffiles_zip_download'),
    path('mafs/<int:pk>/update-coords/', MafUpdateCoordsView.as_view(), name='maf_update_coords'),
    path('houses/<int:pk>/update-coords/', HouseUpdateCoordsView.as_view(), name='house_update_coords'),


]
