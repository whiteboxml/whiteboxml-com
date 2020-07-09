from django.contrib.sitemaps.views import sitemap
from django.urls import path
from django_distill import distill_path

from . import views
from .sitemaps import StaticViewSitemap


def get():
    return None


sitemaps = {
    'static': StaticViewSitemap,
}

urlpatterns = [
    distill_path('', views.index, name='landing', distill_func=get, distill_file='index.html'),
    distill_path('portfolio', views.portfolio, name='portfolio', distill_func=get, distill_file='portfolio/index.html'),

    path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap'),
]
