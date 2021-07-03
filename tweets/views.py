from tweets.forms import TweetForm
from django.shortcuts import render,redirect
from django.conf import settings
from django.http import JsonResponse

from .models import Tweet

def home_view(request):
    context = {

    }
    return render(request,"pages/home.html",context)

def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    tweet_list = [{"id":x.id,"content":x.content} for x in qs]
    data = {
        "response":tweet_list
    }
    return JsonResponse(data)


def tweet_create_view(request):
    
    context = {

    }
    if request.method =="POST":
        form = TweetForm(request.POST or None)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.save()
            form = TweetForm()
        return redirect('/tweets/home')
    return render(request,"pages/home.html",context)
        

def  tweet_detail_view(request, tweet_id):
    data = {
        "id":tweet_id,
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not found"
        status = 404
    return JsonResponse(data,status=status) 

