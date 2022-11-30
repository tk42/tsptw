import os
import logging
import googlemaps
import datetime as dt
from datetime import datetime, date
from collections import namedtuple

from pydantic import BaseModel


logger = logging.getLogger("uvicorn")


AUTH0_CLIENT_ID = "ciFCosdQaze8Vwz2CQRci6Xa4Or1GTuu"
AUTH0_DOMAIN = "tk42.jp.auth0.com"

gmaps = googlemaps.Client(key=os.environ.get("GOOGLEMAP_API_KEY"))

Location = namedtuple("Location", ["lat", "lng"])
baseCls = namedtuple(
    "WayPoint", 
    ["id", "timestamp", "name", "address", "location", "staying_min", "start_time", "end_time"]
)

today = datetime.now().date()


def create_datetime(t: dt.time or str, fromisoformat=False):
    if fromisoformat:
        t = dt.time.fromisoformat(t)
    return datetime.combine(today, t)


def geocode(address: str) -> Location:
    results = gmaps.geocode(address)
    print(results)
    location = results[0]["geometry"]["location"]
    return Location(location["lat"], location["lng"])


class WayPoint(baseCls):
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "timestamp": self.timestamp,
            "name": self.name,
            "address": self.address,
            "location": self.location,
            "staying_min": self.staying_min,
            "start_time": self.start_time.isoformat(),
            "end_time": self.end_time.isoformat(),
        }

    @staticmethod
    def from_dict(source: dict):
        return WayPoint(
            source["id"],
            source["timestamp"],
            source["name"],
            source["address"],
            source["location"],
            source["staying_min"],
            datetime.fromisoformat(str(date.today()) + "T" + source["start_time"]),
            datetime.fromisoformat(str(date.today()) + "T" + source["end_time"]),
        )

    def __repr__(self) -> str:
        return (
            f"WayPoint({self.id}, {self.timestamp}, {self.name}, {self.address}, {self.location},"
            + f" {self.staying_min}, {self.start_time}, {self.end_time})"
        )


class Waypoint(BaseModel):
    id: str
    name: str
    address: str
    staying_min: int
    start_time: dt.time
    end_time: dt.time
    timestamp: int


# RequestBody for /solve
class RequestBody(BaseModel):
    start_time: dt.time
    start: Waypoint
    goal: Waypoint
    waypoints: list[Waypoint]
