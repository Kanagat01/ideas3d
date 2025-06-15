from django.urls import path
from catalog.views import *

urlpatterns = [
    path('catalog/', CatalogView.as_view(), name='catalog'),
    path('create-application/', ApplicationCreateView.as_view(),
         name='create_application'),
]
