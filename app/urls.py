from django.contrib.sitemaps.views import sitemap
from django.urls import path

from . import views
from .sitemaps import StaticViewSitemap

sitemaps = {
    'static': StaticViewSitemap,
}

urlpatterns = [
    path('', views.index, name='landing'),
    path('portfolio', views.portfolio, name='portfolio'),
    path('team', views.team, name='team'),
    path('data-for-equity', views.data_for_equity, name='data_for_equity'),
    path('ct', views.contact, name='contact'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap'),
]
