import subprocess
import re
import platform

heroku = "heroku.cmd" if platform.system() == "Windows" else "heroku"


def get_heroku_database_url(app_name):
    # Fetch the Heroku config
    result = subprocess.run(
        [heroku, "config", "-a", app_name], capture_output=True, text=True
    )
    if result.returncode != 0:
        print("Failed to get Heroku config.")
        print(result.stderr)
        return None
    return result.stdout


def parse_database_url(db_url):
    # Parse the DATABASE_URL
    match = re.search(r"postgres://([^:]+):([^@]+)@([^:/]+):([^/]+)/(.+)", db_url)
    if match:
        return {
            "DB_USER": match.group(1),
            "DB_PASSWORD": match.group(2),
            "DB_HOST": match.group(3),
            "DB_PORT": match.group(4),
            "DB_NAME": match.group(5),
            "DB_SSLMODE": "no-verify",  # Assuming SSL mode is no-verify
        }
    return None


def update_heroku_config(app_name, config):
    for key, value in config.items():
        # Update each config variable on Heroku
        arguments = [heroku, "config:set", f"{key}={value}", "-a", app_name]
        print("will run:", " ".join(arguments))
        result = subprocess.run(
            arguments,
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            print(f"Failed to set {key}.")
            print(result.stderr)
        else:
            print(f"Successfully set {key}.")


if __name__ == "__main__":
    app_name = "kunning-koala"
    config_output = get_heroku_database_url(app_name)
    if config_output:
        # Extract DATABASE_URL line
        db_url_line = next(
            (
                line
                for line in config_output.splitlines()
                if line.startswith("DATABASE_URL:")
            ),
            None,
        )
        if db_url_line:
            db_url = db_url_line.split(":", 1)[1].strip()
            config = parse_database_url(db_url)
            if config:
                config["DB_SSLMODE"] = "no-verify"
                update_heroku_config(app_name, config)
            else:
                print("Failed to parse DATABASE_URL.")
        else:
            print("DATABASE_URL not found in Heroku config.")
    else:
        print("No config output received.")
