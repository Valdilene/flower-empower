from django.contrib import admin
from .models import Recipient
from import_export.admin import ImportExportModelAdmin

admin.site.register(Recipient, ImportExportModelAdmin)
