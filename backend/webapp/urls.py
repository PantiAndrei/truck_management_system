# webapp/urls.py

from django.urls import path, include
from rest_framework import routers
from .views import TruckViewSet, DriverProfileViewSet, ClientViewSet, OrderViewSet

router = routers.DefaultRouter()
router.register(r'trucks', TruckViewSet)
router.register(r'drivers', DriverProfileViewSet)
router.register(r'clients', ClientViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
