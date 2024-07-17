from django.contrib import admin
from .models import Recipient


@admin.register(Recipient)
class RecipientAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone', 'city', 'state', 'zip', 'end_date', 'group')
    search_fields = ('first_name', 'last_name', 'email', 'phone', 'city', 'state', 'zip')
    list_filter = ('state', 'city', 'end_date', 'group')
    ordering = ('last_name', 'first_name')
    fieldsets = (
        (None, {
            'fields': ('first_name', 'last_name', 'email', 'phone')
        }),
        ('Address Information', {
            'fields': ('address', 'city', 'state', 'zip')
        }),
        ('Additional Information', {
            'fields': ('end_date', 'group')
        }),
    )
