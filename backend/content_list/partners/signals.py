from django.core.cache import cache
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from content_list.partners.models import Partners


@receiver(post_save, sender=Partners)
@receiver(post_delete, sender=Partners)
def clear_partners_cache(sender, instance, **kwargs):
    cache.delete("partners-data")