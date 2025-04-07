from django.apps import AppConfig


class OurProjectsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "our_projects"
    verbose_name = "Наши проекты"

    def ready(self):
        import our_projects.signals.gallery_signals
