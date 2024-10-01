# webapp/models.py

from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("regular", "Regular User"),
        ("driver", "Driver"),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="regular")

    def __str__(self):
        return f"{self.user.username} - {self.role}"


class DriverProfile(models.Model):
    STATUS_CHOICES = [
        ("available", "Available"),
        ("on_duty", "On Duty"),
        ("on_break", "On Break"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    license_number = models.CharField(max_length=20)
    certifications = models.TextField(blank=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="available"
    )

    def __str__(self):
        return self.user.get_full_name()


class Truck(models.Model):
    STATUS_CHOICES = [
        ("in_service", "In Service"),
        ("in_garage", "In the Garage"),
        ("in_transit", "In Transit"),
        ("stationary", "Stationary"),
        ("other", "Other"),
    ]

    LOAD_STATUS_CHOICES = [
        ("empty", "Empty"),
        ("loaded", "Loaded"),
    ]

    license_plate = models.CharField(max_length=10, unique=True)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    capacity = models.FloatField()
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="in_service"
    )
    load_status = models.CharField(
        max_length=10, choices=LOAD_STATUS_CHOICES, default="empty"
    )
    assigned_driver = models.ForeignKey(
        DriverProfile, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"{self.license_plate} - {self.make} {self.model}"


class Client(models.Model):
    name = models.CharField(max_length=100)
    contact_information = models.TextField()
    billing_details = models.TextField(blank=True)
    contract_terms = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
        ("canceled", "Canceled"),
    ]

    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    delivery_date = models.DateTimeField()
    pickup_location = models.CharField(max_length=255)
    delivery_location = models.CharField(max_length=255)
    goods_description = models.TextField()
    weight = models.FloatField()
    volume = models.FloatField()
    assigned_truck = models.ForeignKey(
        Truck, on_delete=models.SET_NULL, null=True, blank=True
    )
    assigned_driver = models.ForeignKey(
        DriverProfile, on_delete=models.SET_NULL, null=True, blank=True
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )

    def __str__(self):
        return f"Order {self.id} for {self.client.name}"
