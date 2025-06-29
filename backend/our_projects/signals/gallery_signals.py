from django.core.cache import cache
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from our_projects.models import OurProject


@receiver(post_save, sender=OurProject)
@receiver(post_delete, sender=OurProject)
def clear_our_project_gallery_cache(sender, instance, **kwargs):
    cache.delete('our_projects_gallery')