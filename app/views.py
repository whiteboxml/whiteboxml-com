from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render
from django.template.loader import render_to_string
from django.utils.html import strip_tags


# Create your views here.
def index(request):
    return render(request, 'landing/index.html', {'ga_token': settings.GA_TOKEN})


def contact(request):
    if request.method == 'POST':
        msg_html = render_to_string('mail/template.html',
                                    {'username': request.POST['full_name'],
                                     'email': request.POST['email'],
                                     'message': request.POST['message']})
        plain_message = strip_tags(msg_html)

        try:
            send_mail(
                subject='WhiteboxML Contact Form',
                message=plain_message,
                html_message=msg_html,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.DEFAULT_FROM_EMAIL],
                fail_silently=False
            )

            print(f'message from {request.POST["email"]} successfully sent')

            return JsonResponse({})

        except Exception as ex:
            print(ex)
            print(f'message from {request.POST["email"]} could not be sent')

            error_msg = f"""
                message could not be sent, please contact {settings.DEFAULT_FROM_EMAIL}
            """

            return JsonResponse({'Error': error_msg})
