from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

app = Celery('project')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')


# Define the Celery beat schedule
app.conf.beat_schedule = {
    'send-group1-emails-every-friday-16h': {
        'task': 'event.tasks.send_group1_emails',
        'schedule': crontab(hour="16", minute="30", day_of_week="1"),
    },
    'send-group2-emails-every-friday-16h': {
        'task': 'event.tasks.send_group2_emails',
        'schedule': crontab(hour="16", minute="30", day_of_week="1"),
    },
}

# Set the timezone
app.conf.timezone = 'Europe/Berlin'  # or your preferred timezone
