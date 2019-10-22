from django.http import JsonResponse
from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'landing/index.html')


def contact(request):
    print(request.body)
    return JsonResponse({})
