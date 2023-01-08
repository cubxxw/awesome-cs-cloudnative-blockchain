

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

## HarmonyOS

+ [开源地址](https://github.com/Awesome-HarmonyOS/HarmonyOS)

```bash
xiongxinweia ➜ /workspaces $ cloc HarmonyOS/
    2258 text files.
    1682 unique files.                                          
     868 files ignored.

github.com/AlDanial/cloc v 1.96  T=3.14 s (535.6 files/s, 309464.5 lines/s)
------------------------------------------------------------------------------------
Language                          files          blank        comment           code
------------------------------------------------------------------------------------
C                                   667          64789         122111         302975
C/C++ Header                        650          36740         125515         152748
XML                                  72            124             18          67902
Bourne Shell                         42           4357           5465          32697
Markdown                             38           4544              0          11500
m4                                   10            809             71           7019
Perl                                 62            937            987           5892
Text                                 22            696              0           4270
Assembly                             25            987           3993           3436
make                                 43           1230           1194           3414
C++                                   4            250            161           1182
HTML                                  4            129              0            759
CMake                                24            171            141            727
Visual Studio Solution                2              2              2            661
Python                                2            108             10            370
INI                                   2              0              0            166
Oracle Forms                          2             38             43            102
YAML                                  5             20             22             91
Pascal                                1             13            139             42
DOS Batch                             2              4              0             21
JSON                                  1              0              0             18
Properties                            1              0              0              9
Tcl/Tk                                1              0              0              4
------------------------------------------------------------------------------------
SUM:                               1682         115948         259872         596005
------------------------------------------------------------------------------------
```


## DragonOS

+ [开源地址](https://github.com/fslongjin/DragonOS)

```bash
@xiongxinweia ➜ /workspaces $ cloc DragonOS/
     505 text files.
     483 unique files.                                          
      26 files ignored.

github.com/AlDanial/cloc v 1.96  T=0.28 s (1700.7 files/s, 229240.7 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
C                              117           3723           6668          21559
C/C++ Header                   144           2378           5742          10328
Markdown                        49           2608              0           3660
Rust                            54            518            742           2998
Bourne Shell                    20            136            144            794
Assembly                         6            226            211            710
make                            55            388             45            589
JSON                             3              0              0            213
reStructuredText                22             94            141             91
Dockerfile                       2             13             14             67
Python                           3             27             38             67
YAML                             1              9              0             41
TOML                             4             17              6             36
DOS Batch                        1              8              1             26
INI                              1              0              0             26
Text                             1              0              0              3
-------------------------------------------------------------------------------
SUM:                           483          10145          13752          41208
-------------------------------------------------------------------------------
```


## cub

🚸 c-ub (c-universal blockchain) is a blockchain society based on blockchain, providing a learning platform for all. Welcome to cub🎉

+ [开源地址](https://github.com/c-ub/cub)

```bash
@xiongxinweia ➜ /workspaces $ cloc cub/
     478 text files.
     434 unique files.                                          
     571 files ignored.

1 error:
Line count, exceeded timeout:  cub/cub/src/main/resources/static/static/jspdf/1.2.61/jspdf.min.js

github.com/AlDanial/cloc v 1.96  T=1.74 s (249.1 files/s, 49402.3 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
HTML                            62           5094            225          18444
Java                           144           2588           9334          12373
C/C++ Header                    11           1263           1690           5916
JavaScript                      42            990           3340           5528
XML                             64            924           1325           4636
SVG                              2              0              0           2959
Text                            33            381              0           1402
Properties                      33            279           1157           1069
Ant                             16            287            426            854
C                                1            165            229            737
IDL                              2            150              0            675
Bourne Shell                     3             55            121            300
Markdown                         3             96              0            239
Solidity                         5             18             12            226
CSS                              9             32             25            205
DOS Batch                        2             35             30            131
Maven                            1             12              0             81
Dockerfile                       1              1              6              6
-------------------------------------------------------------------------------
SUM:                           434          12370          17920          55781
-------------------------------------------------------------------------------
```

## Cubos

⚡cubgo-os（幼兽操作系统）由Go语言开发，可以运行基础应用~

+ [开源地址](https://github.com/cubxxw/cubgo-os)

```bash
@xiongxinweia ➜ /workspaces $ cloc  cubgo-os/
     184 text files.
     170 unique files.                                          
      23 files ignored.

github.com/AlDanial/cloc v 1.96  T=0.11 s (1506.4 files/s, 174551.8 lines/s)
--------------------------------------------------------------------------------
Language                      files          blank        comment           code
--------------------------------------------------------------------------------
Go                              126           2000           1231          10804
Assembly                         12            376            139           2171
Markdown                         16            763              6           1313
YAML                              7              8              3            211
C/C++ Header                      2             56             71            191
Bourne Shell                      2             23             31            105
C                                 2             16             10             90
JSON                              2              1              0             76
Bourne Again Shell                1              1              0              2
--------------------------------------------------------------------------------
SUM:                            170           3244           1491          14963
--------------------------------------------------------------------------------
```

## K3s

+ [项目地址](https://github.com/k3s-io/k3s)

```bash
@xiongxinweia ➜ /workspaces $ cloc k3s/
     536 text files.
     472 unique files.                                          
      65 files ignored.

github.com/AlDanial/cloc v 1.96  T=0.61 s (777.6 files/s, 79671.7 lines/s)
--------------------------------------------------------------------------------
Language                      files          blank        comment           code
--------------------------------------------------------------------------------
Go                              235           3970           2111          27285
YAML                             89            138             90           5019
Bourne Shell                     31            432            377           2568
Markdown                         47            639             27           1858
Bourne Again Shell               35            401            118           1830
HCL                              19            130              5            969
Dockerfile                        7             36              2            139
Ruby                              1              2              2             51
JSON                              2              0              0             49
make                              2             18              0             43
NAnt script                       1              5              0             21
Text                              3              4              0             21
--------------------------------------------------------------------------------
SUM:                            472           5775           2732          39853
--------------------------------------------------------------------------------
```



## Istio

+ [项目地址](https://github.com/istio/istio.git)

```bash
@xiongxinweia ➜ /workspaces $ cloc istio/
    4198 text files.
    3407 unique files.                                          
     817 files ignored.

1 error:
Line count, exceeded timeout:  istio/pilot/pkg/networking/core/v1alpha3/gateway_simulation_test.go

github.com/AlDanial/cloc v 1.96  T=11.67 s (291.8 files/s, 50381.9 lines/s)
--------------------------------------------------------------------------------
Language                      files          blank        comment           code
--------------------------------------------------------------------------------
Go                             1663          37379          53284         326194
YAML                           1405           1406           3519         108916
JSON                             59            131              0          28317
CSS                               4              7             22           7368
Markdown                         76           1314              0           3527
Bourne Shell                     60            683           1384           3090
Text                             40            127              0           2375
JavaScript                        5            606            229           1822
make                             18            277            376            886
Python                            6            180            207            573
Protocol Buffers                  5            345            562            537
SVG                               6              0             24            453
Dockerfile                       30            121            214            341
Java                              7             42            115            211
HTML                              3             21             58            182
Ruby                              2             34             46            129
Bourne Again Shell                4             29             77            106
XML                               4             18             22             43
INI                               1              4              0             42
Bazel                             2              9              1             41
Gradle                            4              8              0             41
C++                               1              7             14             17
C/C++ Header                      1              6             13             17
SQL                               1              2              0             11
--------------------------------------------------------------------------------
SUM:                           3407          42756          60167         485239
--------------------------------------------------------------------------------
```



## prometheus

+ [项目地址](https://github.com/prometheus/prometheus)

```bash
@xiongxinweia ➜ /workspaces $ cloc prometheus/
    1088 text files.
     969 unique files.                                          
     143 files ignored.

1 error:
Line count, exceeded timeout:  prometheus/config/config_test.go

github.com/AlDanial/cloc v 1.96  T=2.90 s (333.7 files/s, 126371.5 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
Go                             437          18957          18338         146831
JSON                            38              0              0          61855
YAML                           229            301            481          43336
CSS                             14           1487             53          16938
TypeScript                     115            944            664          14200
JavaScript                      25           2891           2652          11938
Markdown                        59           2925             11          10239
LESS                             1            269              2           3620
SVG                              8              1             14           3187
Text                             5            152              0           1418
yacc                             1             93             69            587
SCSS                             6            100             41            432
HTML                             8             39             32            413
Bourne Shell                    10             88             84            381
Protocol Buffers                 3             54            143            223
lex                              2             29              0            154
make                             4             38             39            117
Dockerfile                       2              7              0             36
XML                              2              0              0              2
-------------------------------------------------------------------------------
SUM:                           969          28375          22623         315907
-------------------------------------------------------------------------------
```


## Sealos

Build, Share and Run Both Your Kubernetes Cluster and Distributed Applications (Project under CNCF)

+ [项目地址](https://github.com/sealerio/sealer.git)

```bash
@xiongxinweia ➜ /workspaces $ cloc sealer/
    8996 text files.
    8405 unique files.                                          
     597 files ignored.

5 errors:
Line count, exceeded timeout:  sealer/vendor/golang.org/x/net/idna/tables10.0.0.go
Line count, exceeded timeout:  sealer/vendor/golang.org/x/net/idna/tables11.0.0.go
Line count, exceeded timeout:  sealer/vendor/golang.org/x/net/idna/tables12.0.0.go
Line count, exceeded timeout:  sealer/vendor/golang.org/x/net/idna/tables13.0.0.go
Line count, exceeded timeout:  sealer/vendor/golang.org/x/net/idna/tables9.0.0.go

github.com/AlDanial/cloc v 1.96  T=32.76 s (256.5 files/s, 65310.0 lines/s)
--------------------------------------------------------------------------------
Language                      files          blank        comment           code
--------------------------------------------------------------------------------
Go                             7676         163385         280749        1483296
JSON                              9              1              0         106504
Markdown                        307           7661             44          23530
YAML                            149            914            895          15272
Assembly                         48           1964           1426           8987
Text                             40            309              0           8278
Protocol Buffers                 67           4163          14376           7467
C/C++ Header                      8            623            700           2234
Bourne Shell                     29            240            614           1452
make                             40            401            197           1261
Bourne Again Shell                5             98            270            800
C                                 6             92             60            632
Dockerfile                        9             50             79            260
TOML                              8             47             61            148
HCL                               2             21              6            121
PowerShell                        1              3              8              1
SVG                               1              0              0              1
--------------------------------------------------------------------------------
SUM:                           8405         179972         299485        1660244
--------------------------------------------------------------------------------
```


## Gogs

Gogs is a painless self-hosted Git service

+ [项目地址](https://github.com/gogs/gogs)

```bash
@xiongxinweia ➜ /workspaces $ cloc gogs/
    1111 text files.
     733 unique files.                                          
    1368 files ignored.

github.com/AlDanial/cloc v 1.96  T=2.61 s (281.4 files/s, 89639.5 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JavaScript                     172           9031           7404          83011
Go                             288           8439           5392          46747
INI                             35           3007            234          43266
HTML                           130           2561             26          13784
LESS                            14            290             13           3212
CSS                             13            409            441           2764
Markdown                        17            351              0           1020
YAML                            18             60             57            844
Bourne Shell                    21            157            183            654
Dockerfile                       1              8              2             34
XML                              1              0              7             32
TOML                             1              7              0             19
JSON                             6              0              0             15
SVG                             14              0              0             14
DOS Batch                        1              3             12             10
SQL                              1              1              0              9
-------------------------------------------------------------------------------
SUM:                           733          24324          13771         195435
-------------------------------------------------------------------------------
```


## Gites

Git with a cup of tea, painless self-hosted git service

+  [go-gitea / gitea 开源地址](https://github.com/go-gitea/gitea)

```bash
@xiongxinweia ➜ /workspaces $ cloc gitea/
    4444 text files.
    2934 unique files.                                          
    2113 files ignored.

1 error:
Line count, exceeded timeout:  gitea/routers/web/web.go

github.com/AlDanial/cloc v 1.96  T=6.66 s (440.8 files/s, 97595.7 lines/s)
--------------------------------------------------------------------------------
Language                      files          blank        comment           code
--------------------------------------------------------------------------------
Go                             1904          41250          32426         241298
JavaScript                      100          17813           1808          99217
INI                              33           4563           2403          70811
CSS                               2           8569           3276          31452
Markdown                        174           4388             36          20470
JSON                             21              8              0          18913
Properties                      123           2117           7980          15390
LESS                             42           1703            124           9198
YAML                             97            696            111           9025
SVG                             372              1              2            903
make                              3            203             11            806
Vuejs Component                   7             64             49            796
Bourne Shell                     21            126            141            489
HTML                              7             52             17            390
Bourne Again Shell               21             40             27            218
Dockerfile                        2             30             12            100
XML                               2              6              7             72
diff                              1              7             15             17
TOML                              1              1              0              9
SQL                               1              0              0              2
--------------------------------------------------------------------------------
SUM:                           2934          81637          48445         519576
--------------------------------------------------------------------------------
```


## Git

+ [开源地址](https://github.com/git/git.git)

```bash
@xiongxinweia ➜ /workspaces $ cloc git
    4256 text files.
    3232 unique files.                                          
    1061 files ignored.

github.com/AlDanial/cloc v 1.96  T=3.58 s (903.8 files/s, 378510.8 lines/s)
-----------------------------------------------------------------------------------
Language                         files          blank        comment           code
-----------------------------------------------------------------------------------
PO File                             54         102016          59439         301869
C                                  565          44356          38288         255020
Bourne Shell                      1244          41221          17341         244234
Text                               838          26551              0          98127
Perl                                89           5507           5297          31540
C/C++ Header                       282           5881          16322          21308
Tcl/Tk                              41           1674            647          10839
make                                23            764            926           4044
Python                               3            889            706           3358
Bourne Again Shell                   2            297            506           2835
diff                                36            106            418           1828
m4                                   2            122             14           1190
ASP.NET                              7            141              0            920
CMake                                1            192             74            834
CSS                                  2            169             30            783
JavaScript                           7            203            649            761
Markdown                             8            267              0            684
YAML                                 5             50            103            599
Go                                   4             53             84            421
zsh                                  1             41             21            232
DOS Batch                            3             52            118            117
XSLT                                 6             12             16             67
XML                                  2              0              5             50
C Shell                              1             18             64             45
ReScript                             2             10              0             44
Ruby                                 1              5              0             43
Windows Resource File                1              2              0             22
Lisp                                 2              0              0             12
-----------------------------------------------------------------------------------
SUM:                              3232         230599         141068         981826
-----------------------------------------------------------------------------------
```


## Sealos

sealos is a Kubernetes distribution, a general-purpose cloud operating system for managing cloud-native applications. Demo: [https://cloud.sealos.io](https://cloud.sealos.io/)

+ [项目地址](sealos is a Kubernetes distribution, a general-purpose cloud operating system for managing cloud-native applications. Demo: [https://cloud.sealos.io](https://cloud.sealos.io/))

```bash
@xiongxinweia ➜ /workspaces $ cloc sealos
    1553 text files.
    1271 unique files.                                          
     353 files ignored.

github.com/AlDanial/cloc v 1.96  T=0.68 s (1866.0 files/s, 189017.9 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
Go                             480           7524           9679          45633
YAML                           313           1824           1903          26983
Markdown                       183           3820              8          16027
TypeScript                     112            602            218           6330
SCSS                            35            424             29           2710
make                            19            423            396           1117
SVG                             56              5              1            676
Bourne Shell                    13            184            184            647
Rust                            10             61            134            366
Dockerfile                      28             63            108            210
JSON                             8              5              0            200
JavaScript                       7              9              7            141
Text                             3              6              0             37
TOML                             1              1              0             11
HTML                             1              4             12             10
XML                              1              0              0              9
NAnt script                      1              0              0              5
-------------------------------------------------------------------------------
SUM:                          1271          14955          12679         101112
-------------------------------------------------------------------------------
```


## Go 

+ [开源地址](https://github.com/golang/go.git)

```bash
@xiongxinweia ➜ /workspaces $ git clone https://github.com/golang/go.git; cloc go
Cloning into 'go'...
remote: Enumerating objects: 555397, done.
remote: Counting objects: 100% (57/57), done.
remote: Compressing objects: 100% (43/43), done.
remote: Total 555397 (delta 14), reused 38 (delta 11), pack-reused 555340
Receiving objects: 100% (555397/555397), 319.31 MiB | 16.20 MiB/s, done.
Resolving deltas: 100% (442657/442657), done.
Updating files: 100% (11967/11967), done.
   11618 text files.
   10772 unique files.                                          
    1183 files ignored.

8 errors:
Line count, exceeded timeout:  go/src/cmd/dist/build.go
Line count, exceeded timeout:  go/src/cmd/trace/static/webcomponents.min.js
Line count, exceeded timeout:  go/src/net/http/requestwrite_test.go
Line count, exceeded timeout:  go/src/vendor/golang.org/x/net/idna/tables10.0.0.go
Line count, exceeded timeout:  go/src/vendor/golang.org/x/net/idna/tables11.0.0.go
Line count, exceeded timeout:  go/src/vendor/golang.org/x/net/idna/tables12.0.0.go
Line count, exceeded timeout:  go/src/vendor/golang.org/x/net/idna/tables13.0.0.go
Line count, exceeded timeout:  go/src/vendor/golang.org/x/net/idna/tables9.0.0.go

github.com/AlDanial/cloc v 1.96  T=37.98 s (283.6 files/s, 71791.4 lines/s)
-----------------------------------------------------------------------------------
Language                         files          blank        comment           code
-----------------------------------------------------------------------------------
Go                                8833         201582         332954        1773600
Text                              1080          11255              0         191421
Assembly                           559          16093          21420         122389
HTML                                17           3313            105          25936
C                                  130           1268            938           6676
JSON                                20              0              0           3122
CSV                                  1              0              0           2119
Markdown                            26            632            101           1801
Bourne Shell                        17            255            872           1669
JavaScript                          10            233            221           1521
Perl                                10            173            171           1109
Bourne Again Shell                  15            117            258            518
C/C++ Header                        24            127            285            514
Python                               1            133            104            374
CSS                                  3              4             13            337
DOS Batch                            5             56             69            185
Windows Resource File                4             22              0            143
Logos                                2             16              0            101
Dockerfile                           2             13             15             47
C++                                  2             11             14             24
make                                 5              9             10             21
Objective-C                          1              2              3             11
Fortran 90                           2              1              3              8
awk                                  1              1              6              7
YAML                                 1              0              0              5
MATLAB                               1              1              0              4
-----------------------------------------------------------------------------------
SUM:                             10772         235317         357562        2133662
-----------------------------------------------------------------------------------
```


## rust

+ [开源地址](https://github.com/rust-lang/rust.git)

```bash

```



## Gin

+ [开源地址](https://github.com/gin-gonic/gin)

```bash
@xiongxinweia ➜ /workspaces $ cloc gin
     124 text files.
     116 unique files.                                          
       9 files ignored.

1 error:
Line count, exceeded timeout:  gin/gin_integration_test.go

github.com/AlDanial/cloc v 1.96  T=3.23 s (35.9 files/s, 7045.1 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
Go                              96           2758           3015          12463
Markdown                        11            700              4           3439
YAML                             7             24             42            219
make                             1              8              0             69
Protocol Buffers                 1              2              0             10
-------------------------------------------------------------------------------
SUM:                           116           3492           3061          16200
-------------------------------------------------------------------------------
```


## hugo

+ [开源地址](https://github.com/gohugoio/hugo.git)

```bash
Receiving objects: 100% (61044/61044), 110.85 MiB | 15.76 MiB/s, done.
Resolving deltas: 100% (42023/42023), done.
    1650 text files.
    1601 unique files.                                          
     393 files ignored.

github.com/AlDanial/cloc v 1.96  T=2.33 s (686.9 files/s, 103561.8 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
Go                             753          25707          19217         119545
Markdown                       551          11918            121          34108
HTML                           128            252             45          11847
JSON                            11              0              0           6903
CSS                             29            529           1011           5436
SVG                             62              3              7           1640
TOML                            19            274             58           1440
YAML                            11             45             14            537
JavaScript                      14             32             58            182
XML                              7              2              0            147
CSV                              1              1              0            129
Bourne Shell                     8             31             12             51
Dockerfile                       1             14             10             21
Text                             4              1              0             12
SCSS                             1              1              0              6
Sass                             1              1              0              5
-------------------------------------------------------------------------------
SUM:                          1601          38811          20553         182009
-------------------------------------------------------------------------------
```



### Docker - moby

+ [开源地址](https://github.com/moby/moby.git)

```bash
Receiving objects: 100% (349017/349017), 186.70 MiB | 14.30 MiB/s, done.
Resolving deltas: 100% (231906/231906), done.
Updating files: 100% (7357/7357), done.
    7319 text files.
    6888 unique files.                                          
     466 files ignored.

5 errors:
Line count, exceeded timeout:  moby/vendor/golang.org/x/net/idna/tables10.0.0.go
Line count, exceeded timeout:  moby/vendor/golang.org/x/net/idna/tables11.0.0.go
Line count, exceeded timeout:  moby/vendor/golang.org/x/net/idna/tables12.0.0.go
Line count, exceeded timeout:  moby/vendor/golang.org/x/net/idna/tables13.0.0.go
Line count, exceeded timeout:  moby/vendor/golang.org/x/net/idna/tables9.0.0.go

github.com/AlDanial/cloc v 1.96  T=33.26 s (207.1 files/s, 57220.8 lines/s)
----------------------------------------------------------------------------------
Language                        files          blank        comment           code
----------------------------------------------------------------------------------
Go                               6135         161010         210318        1219779
YAML                               95           6083           1143         183805
Markdown                          275          13675            107          42401
Text                               19            101              0          17936
Assembly                           57           3420           1403          12037
Protocol Buffers                   82           2018           3459           5850
JSON                               31              1              0           4377
Bourne Shell                       53            669            910           3935
Bourne Again Shell                 47            257            210           1660
make                               32            423            240           1442
Dockerfile                         25            182            298           1244
PowerShell                          3            103            157            472
Groovy                              1             26            109            433
Python                              2             37             11            255
HCL                                 4             44             30            245
C                                  10             43             28            230
TOML                                8             55             45            199
Starlark                            3             10              0            119
Windows Message File                1              7              0             32
XML                                 1              0              0             16
INI                                 1              2              0             10
SVG                                 3              0              0              3
----------------------------------------------------------------------------------
SUM:                             6888         188166         218468        1496480
----------------------------------------------------------------------------------
```


## rust

```bash
@xiongxinweia ➜ /workspaces $ cloc rust/
   38978 text files.
   27275 unique files.                                          
   11729 files ignored.

1 error:
Line count, exceeded timeout:  rust/src/tools/rust-analyzer/crates/syntax/src/ast/token_ext.rs

github.com/AlDanial/cloc v 1.96  T=15.03 s (1815.3 files/s, 150365.0 lines/s)
---------------------------------------------------------------------------------------
Language                             files          blank        comment           code
---------------------------------------------------------------------------------------
Rust                                 24555         240489         365519        1482245
Markdown                               896          14870            261          54066
YAML                                   174           1291            332           9916
JSON                                    30              6              0           9744
Text                                   166            264              0           7260
JavaScript                              84            641           1120           6745
Python                                  34           1201           1157           5109
TOML                                   328            774            302           4990
Bourne Shell                           119            839            773           3858
make                                   308            900           1099           3608
C++                                     13            490            278           3427
TypeScript                              20            521            214           3386
diff                                   227           1211           7613           3184
Freemarker Template                     43           1163              0           3125
HTML                                    94            255             16           2845
CSS                                      9            313            196           2409
Dockerfile                              53            439            201           1883
C                                       61            295            139           1416
AsciiDoc                                 2            236             70           1347
XML                                     12             49             67            836
WiX source                               3             42             26            351
SVG                                      9              2              2            316
Assembly                                 5             25            101            268
Bourne Again Shell                       1             29             58            261
Puppet                                  12             40            116            224
C/C++ Header                             1             15              1            104
Windows Module Definition                5              4              4             53
XSLT                                     2              6              8             44
PowerShell                               1              7              8             28
CMake                                    1              8              0             25
Logos                                    1              5              0             18
Windows Resource File                    3             10              4             18
DOS Batch                                3              6              3             14
---------------------------------------------------------------------------------------
SUM:                                 27275         266446         379688        1613123
---------------------------------------------------------------------------------------
```


## c
