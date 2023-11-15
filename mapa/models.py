from django.db import models

# Create your models here.

class CoordsModel(models.Model):

    POINT_CHOICE = [("0", "Ascensor"), ("1", "Rampa"), ("2", "Otro")]
    STATUS = [("0", "Verde"), ("1", "Amarillo"), ("2", "Rojo")]

    name = models.CharField(max_length=100)
    point_type = models.CharField(max_length=1, choices=POINT_CHOICE)
    status = models.CharField(max_length=1, choices=STATUS)
    coord_x = models.CharField(max_length=100)
    coord_y = models.CharField(max_length=100)
    comment = models.CharField(max_length=100, blank=True)
    layer = models.CharField(max_length=100)

    def __str__(self):
        return self.point_type