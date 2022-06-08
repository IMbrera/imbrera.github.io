---
published: true
layout: post
title: HTTP сервисы
---
## HTTP сервисы 
 
![Расшиирение.png]({{site.baseurl}}/images/HTTPСервисы/Расшиирение.png)

![HTTP1.png]({{site.baseurl}}/images/HTTPСервисы/HTTP1.png)

Код обработчика в [github](https://github.com/IMbrera/onecpractic/blob/main/json/Http%20%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B/GET/employees.txt)

Для чтения и записи в 1С, создаю внешнюю обработку, код обработки в [github](https://github.com/IMbrera/onecpractic/blob/main/json/%D0%9E%D0%B1%D0%BC%D0%B5%D0%BD/%D0%A0%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82.txt)

После публикации конфигурации - добавляю в vrdфайл (iis) строку сервиса
<service name="Расш1_HTTPEmployees"
				rootUrl="extension"
				enable="true"
				reuseSessions="autouse"
				sessionMaxAge="20"
				poolSize="10"
				poolTimeout="5"/>