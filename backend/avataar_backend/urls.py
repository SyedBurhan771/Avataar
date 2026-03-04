from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.http import HttpResponse
# Import views later per component

router = DefaultRouter()
# Register viewsets here as we add them, e.g., router.register(r'projects', ProjectViewSet)

def home(request):
    return HttpResponse("<h1>Welcome to Avataar Backend API</h1><p>Use /admin/ for data management or /api/ for endpoints.</p>")

urlpatterns = [
    path('', home, name='home'),               # ← Add this line
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]