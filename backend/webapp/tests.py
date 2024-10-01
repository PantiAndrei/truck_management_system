# webapp/tests.py

from django.test import TestCase
from .models import Client, Order

class ClientModelTest(TestCase):
    def setUp(self):
        Client.objects.create(name="Test Client", contact_information="123 Main St")

    def test_client_creation(self):
        client = Client.objects.get(name="Test Client")
        self.assertEqual(client.contact_information, "123 Main St")

class OrderModelTest(TestCase):
    def setUp(self):
        client = Client.objects.create(name="Test Client", contact_information="123 Main St")
        Order.objects.create(
            client=client,
            delivery_date="2023-01-01T10:00:00Z",
            pickup_location="Warehouse A",
            delivery_location="Warehouse B",
            goods_description="Electronics",
            weight=1000,
            volume=10
        )

    def test_order_creation(self):
        order = Order.objects.get(goods_description="Electronics")
        self.assertEqual(order.pickup_location, "Warehouse A")
