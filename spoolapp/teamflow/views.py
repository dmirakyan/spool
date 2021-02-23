from django.shortcuts import render
from django.http import HttpResponse, JsonResponse


from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, viewsets

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Team, UserDetails
from .serializers import *


from django.core.mail import send_mail
from django.conf import settings
from lockdown.decorators import lockdown


# Create your views here.




@lockdown()
def lockdownPilot(request):
    if request.method == 'GET':
        return render(request,'results-test.html')

def loginTest(request):
    if request.method == 'GET':
        return render(request,'login-test.html')

def privacyPolicy(request):
    if request.method == 'GET':
        return render(request,'privacy-policy.html')


def termsConditions(request):
    if request.method == 'GET':
        return render(request,'terms-and-conditions.html')

def app(request):
    if request.method == 'GET':
        return render(request,'team.html')

def landing(request):
    if request.method == 'GET':
        return render(request,'index.html')

    if request.method=='POST':
        email = request.POST['email']
        message = 'new interest submission from '+email
        send_mail('Form submission',
                  message,
                  settings.EMAIL_HOST_USER,
                  ['hello@getspool.io'],
                  fail_silently=False)
        return render(request,'index-confirmation.html')

def landingTest(request):
    if request.method == 'GET':
        return render(request,'index-test.html')
        
def thanks(request):
    if request.method == 'GET':
        return render(request,'index-confirmation.html')

class TeamView(viewsets.ModelViewSet):
  serializer_class = TeamSerializer          
  queryset = Team.objects.all()              


# API stuff
@api_view(['GET','POST'])
def team_list(request):
    if request.method == 'GET':
            data = []
            nextPage = 1
            previousPage = 1
            teams = Team.objects.all()
            page = request.GET.get('page', 1)
            paginator = Paginator(teams, 10)
            try:
                data = paginator.page(page)
            except PageNotAnInteger:
                data = paginator.page(1)
            except EmptyPage:
                data = paginator.page(paginator.num_pages)

            serializer = TeamSerializer(data,context={'request': request} ,many=True)
            if data.has_next():
                nextPage = data.next_page_number()
            if data.has_previous():
                previousPage = data.previous_page_number()

            return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/teams/?page=' + str(nextPage), 'prevlink': '/api/teams/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def team_details(request, pk):
    """
    Retrieve, update or delete a team by id/pk.
    """
    try:
        team = Team.objects.get(pk=pk)
    except Team.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TeamSerializer(team,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TeamSerializer(team, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        team.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)