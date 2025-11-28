package com.subtrack.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.processing.Pattern;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Name is required")
  private String name;
  private String category;
    //@Pattern(regexp = "Monthly|Yearly", message = "Cycle must be either 'Monthly' or 'Yearly'")
  private String cycle;
  @Positive(message = "Price must be greater than 0")
  private double price;
  private String currency;
  private  String nextChargeDate;

  private String status;
  private Double lastPrice;
  private Double oldPrice;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  @PrePersist
  protected  void onCreate(){
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate(){
    this.updatedAt = LocalDateTime.now();
  }

}
