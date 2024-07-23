from celery import shared_task
from django.core.mail import send_mass_mail


@shared_task
def send_group1_emails():
    emails = [
        ('Subject 1', 'Message 1', 'flower.empower.management@gmail.com', ['val.siqueira89@gmail.com']),
        # Add more emails here
    ]
    send_mass_mail(emails)


@shared_task
def send_group2_emails():
    emails = [
        ('Subject 2', 'Message 2', 'flower.empower.management@gmail.com', ['xejin69877@padvn.com']),
        # Add more emails here
    ]
    send_mass_mail(emails)
