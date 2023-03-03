<template><div><h1 id="第1节-设计模式概述" tabindex="-1"><a class="header-anchor" href="#第1节-设计模式概述" aria-hidden="true">#</a> 第1节 设计模式概述</h1>
<div><a href = '../README.md' style='float:left'>⬆️上一节🔗</a><a href = '2.md' style='float: right'>⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕Java和Golang的设计模式，设计模式介绍、创建者模式、结构型模式、行为型模式。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="设计模式定义" tabindex="-1"><a class="header-anchor" href="#设计模式定义" aria-hidden="true">#</a> 设计模式定义</h2>
<div class="custom-container tip"><p class="custom-container-title">设计模式：在一定环境下，用固定套路解决问题</p>
<p>GoF给软件设计模式提供了定义，如下：</p>
<p>“软件设计模式(Design Pattern)是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结，使用设计模式是为了可重用代码、让代码更容易被他人理解并且保证代码可靠性。”</p>
<p>一句大白话可以总结：“在一定环境下，用固定套路解决问题。”</p>
</div>
<h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<ul>
<li><a href="https://www.yuque.com/aceld" target="_blank" rel="noopener noreferrer"><strong>Easy 搞定 Golang设计模</strong><ExternalLinkIcon/></a></li>
</ul>
</div>
<h2 id="设计模式的分类" tabindex="-1"><a class="header-anchor" href="#设计模式的分类" aria-hidden="true">#</a> 设计模式的分类</h2>
<div class="custom-container danger"><p class="custom-container-title">GoF提出的设计模式有23个，包括：</p>
<p>（1）创建型(Creational)模式：如何创建对象；</p>
<p>（2）结构型(Structural )模式：如何实现类或对象的组合；</p>
<p>（3）行为型(Behavioral)模式：类或对象怎样交互以及怎样分配职责。</p>
<p>有一个“简单工厂模式”不属于GoF 23种设计模式，但大部分的设计模式书籍都会对它进行专门的介绍。</p>
<p>设计模式目前种类： <code v-pre>GoF的23种   + “简单工厂模式” = 24种</code>。</p>
</div>
<h2 id="如何学习设计模式" tabindex="-1"><a class="header-anchor" href="#如何学习设计模式" aria-hidden="true">#</a> 如何学习设计模式</h2>
<div class="custom-container tip"><p class="custom-container-title">设计模式</p>
<p>设计模式的基础是：多态。</p>
<p>初学者：积累案例，不要盲目的背类图。</p>
<p>初级开发人员：多思考，多梳理，归纳总结，尊重事物的认知规律，注意临界点的突破，不要浮躁。</p>
<p>中级开发人员：合适的开发环境，寻找合适的设计模式来解决问题。</p>
<p>多应用，对经典则组合设计模式的大量，自由的运用。要不断的追求。</p>
</div>
<h2 id="面对对象设计原则" tabindex="-1"><a class="header-anchor" href="#面对对象设计原则" aria-hidden="true">#</a> 面对对象设计原则</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>可能Go语言不算是面对对象，但是不可否认的是Go语言也有很多面对对象的特性~</p>
</div>
<p>对于面向对象软件系统的设计而言，在支持可维护性的同时，提高系统的可复用性是一个至关重要的问题，**如何同时提高一个软件系统的可维护性和可复用性是面向对象设计需要解决的核心问题之一。**在面向对象设计中，可维护性的复用是以设计原则为基础的。每一个原则都蕴含一些面向对象设计的思想，可以从不同的角度提升一个软件结构的设计水平。</p>
<p>**面向对象设计原则为支持可维护性复用而诞生，这些原则蕴含在很多设计模式中，它们是从许多设计方案中总结出的指导性原则。**面向对象设计原则也是我们用于评价一个设计模式的使用效果的重要指标之一。</p>
<p>原则的目的： 高内聚，低耦合</p>
<h2 id="设计模式的类型" tabindex="-1"><a class="header-anchor" href="#设计模式的类型" aria-hidden="true">#</a> 设计模式的类型</h2>
<details class="custom-container details"><summary>设计模式包含如下几类：</summary>
<ol>
<li><strong>单一职责原则</strong>：一个类只负责一项职责，或者说一个类只有一个引起它变化的原因。</li>
<li><strong>开放封闭原则</strong>：一个软件实体如类、模块和函数应该对扩展开放，对修改关闭。</li>
<li><strong>里氏替换原则</strong>：所有引用基类的地方必须能透明地使用其子类的对象。</li>
<li><strong>依赖倒置原则</strong>：抽象不应该依赖于细节，细节应该依赖于抽象。</li>
<li><strong>接口隔离原则</strong>：使用多个专门的接口，而不使用单一的总接口。</li>
<li><strong>合成复用原则</strong>：尽量使用对象组合，而不是继承来达到复用的目的。</li>
<li><strong>迪米特法则</strong>：一个软件实体应当尽可能少地与其他实体发生相互作用。</li>
<li><strong>最少知识原则</strong>：一个软件实体应当尽可能少地与其他实体发生相互作用。</li>
<li><strong>单例模式</strong>：保证一个类仅有一个实例，并提供一个访问它的全局访问点。</li>
<li><strong>工厂方法模式</strong>：定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类。</li>
<li><strong>抽象工厂模式</strong>：提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。</li>
<li><strong>建造者模式</strong>：将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。</li>
<li><strong>原型模式</strong>：用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。</li>
<li><strong>适配器模式</strong>：将一个类的接口转换成客户希望的另外一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。</li>
<li><strong>桥接模式</strong>：将抽象部分与它的实现部分分离，使它们都可以独立地变化。</li>
<li><strong>装饰模式</strong>：动态地给一个对象添加一些额外的职责。就增加功能来说，装饰模式相比生成子类更为灵活。</li>
<li><strong>外观模式</strong>：为子系统中的一组接口提供一个一致的界面，此模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。</li>
<li><strong>享元模式</strong>：运用共享技术有效地支持大量细粒度的对象。</li>
<li><strong>代理模式</strong>：为其他对象提供一种代理以控制对这个对象的访问。</li>
<li><strong>组合模式</strong>：将对象组合成树形结构以表示“部分-整体”的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。</li>
<li><strong>模板方法模式</strong>：定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。</li>
<li><strong>策略模式</strong>：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。</li>
<li><strong>命令模式</strong>：将一个请求封装成一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作。</li>
<li><strong>职责链模式</strong>：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。</li>
<li><strong>迭代器模式</strong>：提供一种方法顺序访问一个聚合对象中各个元素，而又不暴露该对象的内部表示。</li>
<li><strong>观察者模式</strong>：定义对象间的一种一对多的依赖关系，以便当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。</li>
<li><strong>中介者模式</strong>：用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显示地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。</li>
<li><strong>备忘录模式</strong>：在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可将该对象恢复到原先保存的状态。</li>
<li><strong>解释器模式</strong>：给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。</li>
<li><strong>状态模式</strong>：允许一个对象在其内部状态改变时改变它的行为能力。</li>
<li><strong>访问者模式</strong>：表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。</li>
<li><strong>享元模式</strong>：运用共享技术有效地支持大量细粒度的对象。</li>
<li><strong>代理模式</strong>：为其他对象提供一种代理以控制对这个对象的访问。</li>
<li><strong>适配器模式</strong>：将一个类的接口转换成客户希望的另外一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。</li>
<li><strong>装饰模式</strong>：动态地给一个对象添加一些额外的职责。就增加功能来说，装饰模式相比生成子类更为灵活。</li>
<li><strong>桥接模式</strong>：将抽象部分与它的实现部分分离，使它们都可以独立地变化。</li>
<li><strong>组合模式</strong>：将对象组合成树形结构以表示“部分-整体”的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。</li>
<li><strong>外观模式</strong>：为子系统中的一组接口提供一个一致的界面，此模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。</li>
<li><strong>策略模式</strong>：定义一系列算法，把他们一个个封装起来，并且使他们可以相互替换。</li>
<li><strong>模板方法模式</strong>：定义一个操作中算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。</li>
</ol>
</details>
<table>
<thead>
<tr>
<th><strong>模式名称</strong></th>
<th><strong>模式名称</strong></th>
<th><strong>作用</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>创建型模式</strong>  <strong>Creational Pattern（6）</strong></td>
<td>单例模式★★★★☆</td>
<td>是保证一个类仅有一个实例，并提供一个访问它的全局访问点。</td>
</tr>
<tr>
<td>简单工厂模式★★★☆☆</td>
<td>通过专门定义一个类来负责创建其他类的实例，被创建的实例通常都具有共同的父类。</td>
<td></td>
</tr>
<tr>
<td>工厂方法模式★★★★★</td>
<td>定义一个创建产品对象的工厂接口，将实际创建工作推迟到子类中。</td>
<td></td>
</tr>
<tr>
<td>抽象工厂模式★★★★★</td>
<td>提供一个创建一系列相关或者相互依赖的接口，而无需指定它们具体的类。</td>
<td></td>
</tr>
<tr>
<td>原型模式★★★☆☆</td>
<td>用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。</td>
<td></td>
</tr>
<tr>
<td>建造者模式★★☆☆☆</td>
<td>将一个复杂的构建与其表示相分离，使得同样的构建过程可以创建不同的表示。</td>
<td></td>
</tr>
<tr>
<td><strong>结构型模式Structural Pattern（7）</strong></td>
<td>适配器模式★★★★☆</td>
<td>将一个类的接口转换成客户希望的另外一个接口。使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。</td>
</tr>
<tr>
<td>桥接模式★★★☆☆</td>
<td>将抽象部分与实际部分分离，使它们都可以独立的变化。</td>
<td></td>
</tr>
<tr>
<td>组合模式★★☆☆☆</td>
<td>将对象组合成树形结构以表示“部分--整体”的层次结构。使得用户对单个对象和组合对象的使用具有一致性。</td>
<td></td>
</tr>
<tr>
<td>装饰模式★★★☆☆</td>
<td>动态的给一个对象添加一些额外的职责。就增加功能来说，此模式比生成子类更为灵活。</td>
<td></td>
</tr>
<tr>
<td>外观模式★★★★★</td>
<td>为子系统中的一组接口提供一个一致的界面，此模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。</td>
<td></td>
</tr>
<tr>
<td>享元模式★☆☆☆☆</td>
<td>以共享的方式高效的支持大量的细粒度的对象。</td>
<td></td>
</tr>
<tr>
<td>代理模式★★★★☆</td>
<td>为其他对象提供一种代理以控制对这个对象的访问。</td>
<td></td>
</tr>
<tr>
<td><strong>行为型模式Behavioral Pattern（11）</strong></td>
<td>职责链模式★★☆☆☆</td>
<td>在该模式里，很多对象由每一个对象对其下家的引用而连接起来形成一条链。请求在这个链上传递，直到链上的某一个对象决定处理此请求，这使得系统可以在不影响客户端的情况下动态地重新组织链和分配责任。</td>
</tr>
<tr>
<td>命令模式★★★★☆</td>
<td>将一个请求封装为一个对象，从而使你可用不同的请求对客户端进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作。</td>
<td></td>
</tr>
<tr>
<td>解释器模式★☆☆☆☆</td>
<td>如何为简单的语言定义一个语法，如何在该语言中表示一个句子，以及如何解释这些句子。</td>
<td></td>
</tr>
<tr>
<td>迭代器模式★☆☆☆☆</td>
<td>提供了一种方法顺序来访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。</td>
<td></td>
</tr>
<tr>
<td>中介者模式★★☆☆☆</td>
<td>定义一个中介对象来封装系列对象之间的交互。终结者使各个对象不需要显示的相互调用 ，从而使其耦合性松散，而且可以独立的改变他们之间的交互。</td>
<td></td>
</tr>
<tr>
<td>备忘录模式★★☆☆☆</td>
<td>是在不破坏封装的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。</td>
<td></td>
</tr>
<tr>
<td>观察者模式★★★★★</td>
<td>定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。</td>
<td></td>
</tr>
<tr>
<td>状态模式★★☆☆☆</td>
<td>对象的行为，依赖于它所处的状态。</td>
<td></td>
</tr>
<tr>
<td>策略模式★★★★☆</td>
<td>准备一组算法，并将每一个算法封装起来，使得它们可以互换。</td>
<td></td>
</tr>
<tr>
<td>模板方法模式★★★☆☆</td>
<td>得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。</td>
<td></td>
</tr>
<tr>
<td>访问者模式★☆☆☆☆</td>
<td>表示一个作用于某对象结构中的各元素的操作，它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '../README.md' style='float:left'>⬆️上一节🔗</a><a href = '2.md' style='float: right'>⬇️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/go-advancend/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://nsddd.top/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © :本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


