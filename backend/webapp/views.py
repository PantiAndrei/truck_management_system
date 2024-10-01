# webapp/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Truck, DriverProfile, Client, Order
from .serializers import (
    TruckSerializer,
    DriverProfileSerializer,
    ClientSerializer,
    OrderSerializer,
)


class TruckViewSet(viewsets.ModelViewSet):
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer
    permission_classes = [IsAuthenticated]


class DriverProfileViewSet(viewsets.ModelViewSet):
    queryset = DriverProfile.objects.all()
    serializer_class = DriverProfileSerializer
    permission_classes = [IsAuthenticated]


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
