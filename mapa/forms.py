from django import forms
from .models import CoordsModel

class CoordsForm(forms.ModelForm):

    class Meta:
        model = CoordsModel
        fields = "__all__"
        