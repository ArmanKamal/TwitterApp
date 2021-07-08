from django.http import response
from django.test import TestCase, client
from .models import Tweet
from django.contrib.auth.models import User
from rest_framework.test import APIClient

class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="abc",password="password")
        self.user2 = User.objects.create_user(username="cad",password="password")
        Tweet.objects.create(content="my tweet",user=self.user)
        Tweet.objects.create(content="my second tweet",user=self.user2)
    def test_user_created(self):
        tweet = Tweet.objects.create(content="my third tweet",user=self.user)
        self.assertEqual(tweet.id,3)
        self.assertEqual(tweet.user, self.user)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user, password='password')
        return client
    
    def test_tweet_list(self):
        client = self.get_client()
        response = client.get('/api/tweets/')
        self.assertEqual(response.status_code, 200)

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get('/api/tweets/')
        self.assertEqual(response.status_code, 200)


    def test_tweet_create(self):
        data = {"content": "This is my new tweet"}
        client = self.get_client()
        response = client.post('/api/tweets/create/',data)
        self.assertEqual(response.status_code, 201)
    
    def test_detail_view(self):
        client = self.get_client()
        response = client.get('/api/tweets/1/')
        self.assertEqual(response.status_code, 200)
        id = response.json().get("id")
        self.assertEqual(id,1)


    def test_tweet_action_like(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/',{"id":1, "action": "like" })
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likers")
        self.assertEqual(like_count,1)

    def test_tweet_action_unlike(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/',{"id":1,"action":"like"})
        self.assertEqual(response.status_code,200)
        like_count = response.json().get("likers")
        self.assertEqual(like_count,1)

        response = client.post('/api/tweets/action/',{"id":1,"action":"unlike"})
        self.assertEqual(response.status_code,200)
        like_count = response.json().get("likers")
        self.assertEqual(like_count,0)

    def test_tweet_action_retweet(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/',{"id":2, "action": "retweet" })
        self.assertEqual(response.status_code,201)
        data = response.json()
        new_tweet_id = data.get("id")
        self.assertNotEqual(2,new_tweet_id)


    def test_tweet_delete_api_view(self):
        client = self.get_client()
        response = client.delete("/api/tweets/1/delete/")
        self.assertEqual(response.status_code, 200)
        response = client.delete("/api/tweets/1/delete/")
        self.assertEqual(response.status_code, 404)
        response_incorrect_owner = client.delete("/api/tweets/2/delete/")
        self.assertEqual(response_incorrect_owner.status_code, 401)

       