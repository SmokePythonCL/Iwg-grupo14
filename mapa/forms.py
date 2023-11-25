from django import forms
from .models import CoordsModel

class CoordsForm(forms.ModelForm):
    layer = forms.MultipleChoiceField(choices=CoordsModel.LAYERS, widget=forms.CheckboxSelectMultiple())
    
    class Meta:
        model = CoordsModel
        fields = "__all__"