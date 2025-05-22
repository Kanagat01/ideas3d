from rest_framework.generics import ListAPIView
from .models import *
from .serializers import *


class NewsListView(ListAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
