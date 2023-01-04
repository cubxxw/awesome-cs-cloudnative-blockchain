
## 下载方式

```bash
npm install -g cloc                    # https://www.npmjs.com/package/cloc  
sudo apt-get install cloc              # Debian, Ubuntu  
sudo yum install cloc                  # Red Hat, Fedora  
sudo pacman -S cloc                    # Arch  
sudo pkg install cloc                  # FreeBSD  
sudo port install cloc                 # Mac OS X with MacPorts
```



## Springboot

```bash
@xiongxinweia ➜ /workspaces $ cloc spring-boot/
    8682 text files.
    8207 unique files.                                          
     511 files ignored.

3 errors:
Line count, exceeded timeout:  spring-boot/buildSrc/src/main/java/org/springframework/boot/build/mavenplugin/MavenPluginPlugin.java
Line count, exceeded timeout:  spring-boot/spring-boot-project/spring-boot-autoconfigure/src/test/java/org/springframework/boot/autoconfigure/web/reactive/WebFluxAutoConfigurationTests.java
Line count, exceeded timeout:  spring-boot/spring-boot-project/spring-boot-autoconfigure/src/test/java/org/springframework/boot/autoconfigure/web/servlet/WebMvcAutoConfigurationTests.java

github.com/AlDanial/cloc v 1.96  T=10.51 s (781.2 files/s, 68700.1 lines/s)
----------------------------------------------------------------------------------------
Language                              files          blank        comment           code
----------------------------------------------------------------------------------------
Java                                   6340          95869         169059         365157
AsciiDoc                                220           7048              4          16791
JSON                                     97             50              0          12099
Gradle                                  419           1334            189          10327
JavaScript                                3           1847           1402           8460
Maven                                   121             22             17           4692
Kotlin                                  331           1722           5211           4525
XML                                     146            179            151           4226
Properties                              200             78            100           2806
YAML                                     63             11              3           1517
Bourne Shell                             64            195            192            981
HTML                                     43             64             56            842
Text                                     41            189              0            816
CSS                                       6             21             48            560
SQL                                      40             98             84            390
Bourne Again Shell                        5             63             65            366
Groovy                                   24             78            124            284
DOS Batch                                 4             69              4            260
Ruby                                      3             24              0            209
XSD                                       4              2              0            209
Ant                                       2             25              1            147
Dockerfile                                6              6              1             51
Web Services Description                  1              0              0             46
GraphQL                                   5              3             13             38
TOML                                      4              9              6             37
Mustache                                  6              9              0             32
JSP                                       3              4              0             31
Velocity Template Language                4              0              0              4
Markdown                                  2             12             46              0
----------------------------------------------------------------------------------------
SUM:                                   8207         109031         176776         435903
----------------------------------------------------------------------------------------
```


## Spring

clone：`git clone https://github.com/spring-projects/spring-framework.git`

```bash
@xiongxinweia ➜ /workspaces $ cloc spring-framework/
    9292 text files.
    9102 unique files.                                          
     226 files ignored.

3 errors:
Line count, exceeded timeout:  spring-framework/spring-web/src/test/java/org/springframework/http/converter/json/MappingJackson2HttpMessageConverterTests.java
Line count, exceeded timeout:  spring-framework/spring-webflux/src/test/java/org/springframework/web/reactive/resource/ResourceWebHandlerTests.java
Line count, exceeded timeout:  spring-framework/spring-websocket/src/main/java/org/springframework/web/socket/config/MessageBrokerBeanDefinitionParser.java

github.com/AlDanial/cloc v 1.96  T=22.88 s (397.9 files/s, 62563.9 lines/s)
----------------------------------------------------------------------------------------
Language                              files          blank        comment           code
----------------------------------------------------------------------------------------
Java                                   7981         194127         373035         727808
AsciiDoc                                 67          15513           1713          57367
XML                                     616           3220            583          18214
Kotlin                                  123           2112           6093           8945
XSD                                      18            368             27           6834
SQL                                      57             57             62           2353
Text                                     19           1614              0           1964
Gradle                                   35            167            130           1822
YAML                                     13              6              0            720
SVG                                       1              1              1            610
INI                                       3              0              0            537
DTD                                       2            152            524            507
Properties                               78             43             21            478
AspectJ                                  13            163            645            373
Freemarker Template                       4            100            471            343
Markdown                                  7            106             12            251
Bourne Shell                             11             62            133            234
Groovy                                   16             65             70            136
XSLT                                      8             23              1             94
DOS Batch                                 1             21              2             69
JSP                                       4              3              0             35
Protocol Buffers                          3              6              0             30
HTML                                      6              1              5             23
Ruby                                      1              3              1             16
CSS                                       6              3              0             15
Dockerfile                                1              3              0              9
JSON                                      1              0              0              5
JavaScript                                4              0             15              4
Python                                    1              1              0              4
ERB                                       1              0              0              1
Velocity Template Language                1              0              0              1
----------------------------------------------------------------------------------------
SUM:                                   9102         217940         383544         829802
----------------------------------------------------------------------------------------
```


## fabric 项目

```bash
@xiongxinweia ➜ /workspaces $ cloc fabric/
    5584 text files.
    4931 unique files.                                          
     845 files ignored.

5 errors:
Line count, exceeded timeout:  fabric/vendor/golang.org/x/net/idna/tables10.0.0.go
Line count, exceeded timeout:  fabric/vendor/golang.org/x/net/idna/tables11.0.0.go
Line count, exceeded timeout:  fabric/vendor/golang.org/x/net/idna/tables12.0.0.go
Line count, exceeded timeout:  fabric/vendor/golang.org/x/net/idna/tables13.0.0.go
Line count, exceeded timeout:  fabric/vendor/golang.org/x/net/idna/tables9.0.0.go

github.com/AlDanial/cloc v 1.96  T=25.20 s (195.6 files/s, 56780.4 lines/s)
--------------------------------------------------------------------------------
Language                      files          blank        comment           code
--------------------------------------------------------------------------------
Go                             4312         132180         158711        1051487
Markdown                        214           9010            162          32946
reStructuredText                 56           3045           2324           7223
Assembly                         42           1801           2083           6432
Text                             15             70              0           4107
YAML                             96            636           2094           3213
Bourne Shell                     44            466            803           2627
C/C++ Header                      4            579            693           2012
JSON                             52              3              0           1764
make                             27            254            249            865
Protocol Buffers                 21            180            224            616
Bourne Again Shell               15            110             87            573
TOML                              6            125             75            236
Dockerfile                        7             34             37            155
CSS                               1             42             17            146
PEG                               1             33              8             90
Python                            1             53            102             72
HTML                              3              7              5             63
C                                 2             14             30             44
Java                              3              7              4             26
Gradle                            2              6              0             24
INI                               2              2              0             21
TeX                               1              0              0             11
SVG                               1              0              0              5
XML                               2              1              4              2
PowerShell                        1              3              8              1
--------------------------------------------------------------------------------
SUM:                           4931         148661         167720        1114761
--------------------------------------------------------------------------------
```


## eth

```bash
@xiongxinweia ➜ /workspaces $ cloc go-ethereum/
    1775 text files.
    1629 unique files.                                          
     264 files ignored.

github.com/AlDanial/cloc v 1.96  T=2.32 s (703.6 files/s, 292645.0 lines/s)
--------------------------------------------------------------------------------
Language                      files          blank        comment           code
--------------------------------------------------------------------------------
JSON                            188              9              0         286338
Go                             1216          32763          57731         251948
JavaScript                       35           1900           4748           8207
C/C++ Header                     54           1052           2102           7746
C                                14            665            506           5849
Markdown                         52           1202              0           4374
Assembly                          7            706            722           2854
Text                             20             41              0            806
m4                                4             79             12            736
Bourne Shell                      9            139            100            566
Protocol Buffers                  4             73            278            480
Java                              4            143            187            438
YAML                              7             37             50            410
Solidity                          3            105            151            263
Python                            2             56             54            228
HTML                              1             13              0            220
make                              3             44             16            199
Maven                             1              8              0             49
Dockerfile                        2             18             10             37
Ruby                              1              2              0             20
Bourne Again Shell                1              3              3             10
Standard ML                       1              0              0              2
--------------------------------------------------------------------------------
SUM:                           1629          39058          66670         571780
--------------------------------------------------------------------------------
```


## Etcd

```bash
@xiongxinweia ➜ /workspaces $ cloc etcd/
    1422 text files.
    1204 unique files.                                          
     237 files ignored.

github.com/AlDanial/cloc v 1.96  T=0.98 s (1227.2 files/s, 252692.6 lines/s)
--------------------------------------------------------------------------------
Language                      files          blank        comment           code
--------------------------------------------------------------------------------
Go                             1000          23618          24290         173684
Markdown                         57           3360              8           6734
JSON                             32              0              0           4988
Bourne Shell                     52            701            404           3170
SVG                               9              0              7           1394
Protocol Buffers                 13            426            751           1391
YAML                             28            109            107           1271
Text                              1              0              0            465
make                              4             75             46            381
Python                            1             32             41            208
Dockerfile                        5             23              0            195
TOML                              1              8             11             19
Bourne Again Shell                1              1              2              1
--------------------------------------------------------------------------------
SUM:                           1204          28353          25667         193901
--------------------------------------------------------------------------------
```
