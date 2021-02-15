from django.contrib import admin
from .models import Team, UserDetails # add this

class TeamAdmin(admin.ModelAdmin):  # add this
  list_display = ('team_name','team_availability','response_times') # add this

# Register your models here.
admin.site.register(Team, TeamAdmin) # add this