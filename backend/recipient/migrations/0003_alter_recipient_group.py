# Generated by Django 5.0.7 on 2024-07-24 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipient', '0002_alter_recipient_email_alter_recipient_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipient',
            name='group',
            field=models.IntegerField(null=True),
        ),
    ]
