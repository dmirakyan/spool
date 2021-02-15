from django.db import models
from django.contrib.auth.models import User

class Team(models.Model):
    team_id = models.AutoField(primary_key=True)
    team_name = models.CharField(max_length=128, null=True)

    team_availability = models.CharField(max_length=128, null=True)
    response_times = models.CharField(max_length=128, null=True)
   
    def __str__(self):
        return self.team_name

class UserDetails(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)

    team_id = models.ForeignKey(Team, on_delete=models.CASCADE)

    team_role = models.CharField(max_length=128, null=True)
    is_team_lead = models.BooleanField(default=False)

    profile_image = models.CharField(max_length=128, null=True)

    manager = models.CharField(max_length=128, null=True)

    battery_level = models.DecimalField(max_digits=5,decimal_places=5)
    preferred_hours = models.CharField(max_length=128, null=True)
    goals_personal = models.CharField(max_length=1024, null=True)
    goals_professional = models.CharField(max_length=1024, null=True)

    def __str__(self):
        return self.user


# Create your models here.
