from django.test import TestCase
from .models import Tweet
from django.contrib.auth.models import User


class TweetTestCase(TestCase):
    def setUp(self):
        User.objects.create(username="abc",password="password")

    def test_user_created(self):
        user = User.objects.get(username="abc")
        self.assertEqual(user.username,"abc")