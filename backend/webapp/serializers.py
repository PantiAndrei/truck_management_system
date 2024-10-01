# webapp/serializers.py

from rest_framework import serializers
from .models import Truck, DriverProfile, Client, Order
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "password", "first_name", "last_name"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(username=validated_data["username"], **validated_data)
        user.set_password(password)
        user.save()
        return user


class DriverProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = DriverProfile
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        driver_profile = DriverProfile.objects.create(user=user, **validated_data)
        return driver_profile


class TruckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Truck
        fields = "__all__"


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
