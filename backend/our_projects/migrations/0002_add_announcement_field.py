# Generated by Django 4.2.20 on 2025-04-06 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("our_projects", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="ourproject",
            name="announcement",
            field=models.TextField(verbose_name="Анонс", null=True, blank=True),
        ),
    ]
