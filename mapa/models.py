from django.db import models

# Create your models here.
class CoordsModel(models.Model):

    POINT_CHOICE = [("1", "Ascensor"), ("2", "Rampa")]

    name = models.CharField(max_length=100)
    point_type = models.CharField(max_length=1, choices=POINT_CHOICE)
    coords = models.CharField(max_length=100)
    comment = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.point_type