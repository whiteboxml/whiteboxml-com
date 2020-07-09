from django.conf import settings
from django.shortcuts import render


def index(request):
    return render(request, 'landing/index.html', {'ga_token': settings.GA_TOKEN})

def portfolio(request):
    return render(request, 'landing/portfolio.html', {'ga_token': settings.GA_TOKEN})
