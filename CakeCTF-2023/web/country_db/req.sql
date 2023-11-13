<?xml version="1.0"?>
<!DOCTYPE items [
<!ELEMENT items (item*)>
<!ATTLIST items burpVersion CDATA "">
<!ATTLIST items exportTime CDATA "">
<!ELEMENT item (time, url, host, port, protocol, method, path, extension, request, status, responselength, mimetype, response, comment)>
<!ELEMENT time (#PCDATA)>
<!ELEMENT url (#PCDATA)>
<!ELEMENT host (#PCDATA)>
<!ATTLIST host ip CDATA "">
<!ELEMENT port (#PCDATA)>
<!ELEMENT protocol (#PCDATA)>
<!ELEMENT method (#PCDATA)>
<!ELEMENT path (#PCDATA)>
<!ELEMENT extension (#PCDATA)>
<!ELEMENT request (#PCDATA)>
<!ATTLIST request base64 (true|false) "false">
<!ELEMENT status (#PCDATA)>
<!ELEMENT responselength (#PCDATA)>
<!ELEMENT mimetype (#PCDATA)>
<!ELEMENT response (#PCDATA)>
<!ATTLIST response base64 (true|false) "false">
<!ELEMENT comment (#PCDATA)>
]>
<items burpVersion="2023.9.2" exportTime="Sat Nov 11 19:52:57 PKT 2023">
  <item>
    <time>Sat Nov 11 19:52:43 PKT 2023</time>
    <url><![CDATA[http://countrydb.2023.cakectf.com:8020/api/search]]></url>
    <host ip="34.146.13.141">countrydb.2023.cakectf.com</host>
    <port>8020</port>
    <protocol>http</protocol>
    <method><![CDATA[POST]]></method>
    <path><![CDATA[/api/search]]></path>
    <extension>null</extension>
    <request base64="true"><![CDATA[UE9TVCAvYXBpL3NlYXJjaCBIVFRQLzEuMQ0KSG9zdDogY291bnRyeWRiLjIwMjMuY2FrZWN0Zi5jb206ODAyMA0KVXNlci1BZ2VudDogTW96aWxsYS81LjAgKFgxMTsgVWJ1bnR1OyBMaW51eCB4ODZfNjQ7IHJ2OjEwOS4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzExOS4wDQpBY2NlcHQ6ICovKg0KQWNjZXB0LUxhbmd1YWdlOiBlbi1VUyxlbjtxPTAuNQ0KQWNjZXB0LUVuY29kaW5nOiBnemlwLCBkZWZsYXRlDQpSZWZlcmVyOiBodHRwOi8vY291bnRyeWRiLjIwMjMuY2FrZWN0Zi5jb206ODAyMC8NCkNvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbg0KQ29udGVudC1MZW5ndGg6IDEzDQpPcmlnaW46IGh0dHA6Ly9jb3VudHJ5ZGIuMjAyMy5jYWtlY3RmLmNvbTo4MDIwDQpDb25uZWN0aW9uOiBjbG9zZQ0KDQp7ImNvZGUiOiJDQSJ9]]></request>
    <status>404</status>
    <responselength>267</responselength>
    <mimetype>HTML</mimetype>
    <response base64="true"><![CDATA[SFRUUC8xLjEgNDA0IE5PVCBGT1VORA0KU2VydmVyOiBuZ2lueC8xLjIxLjYNCkRhdGU6IFNhdCwgMTEgTm92IDIwMjMgMTQ6NTI6NDMgR01UDQpDb250ZW50LVR5cGU6IHRleHQvaHRtbDsgY2hhcnNldD11dGYtOA0KQ29udGVudC1MZW5ndGg6IDEwMg0KQ29ubmVjdGlvbjogY2xvc2UNCg0KPCFkb2N0eXBlIGh0bWw+CjxodG1sIGxhbmc9ZW4+Cjx0aXRsZT40MDQgTm90IEZvdW5kPC90aXRsZT4KPGgxPk5vdCBGb3VuZDwvaDE+CjxwPk5vIHN1Y2ggY291bnRyeTwvcD4K]]></response>
    <comment></comment>
  </item>
</items>
