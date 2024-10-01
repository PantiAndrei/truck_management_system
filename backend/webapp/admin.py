# webapp/admin.py

from django.contrib import admin
from .models import Truck, DriverProfile, Client, Order

admin.site.register(Truck)
admin.site.register(DriverProfile)
admin.site.register(Client)
admin.site.register(Order)
