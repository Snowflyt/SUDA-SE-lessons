ThisBuild / version := "0.1.0-SNAPSHOT"
ThisBuild / organization := "com.example"
ThisBuild / scalaVersion := "3.2.0"

lazy val root = (project in file("."))
  .settings(
    name := "big-data",
    libraryDependencies ++= Seq(
      ("org.apache.spark" %% "spark-core" % "3.3.0").cross(CrossVersion.for3Use2_13),
      ("org.apache.spark" %% "spark-sql" % "3.3.0").cross(CrossVersion.for3Use2_13),
      "ch.qos.logback" % "logback-classic" % "1.4.1",
      "com.typesafe.scala-logging" %% "scala-logging" % "3.9.5"
    ),
    javaOptions += "--add-exports java.base/sun.nio.ch=ALL-UNNAMED"
  )
