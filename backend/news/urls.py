from django.urls import path
from news.views import *

urlpatterns = [
    path('news/', NewsListView.as_view(), name='news-list')
]
