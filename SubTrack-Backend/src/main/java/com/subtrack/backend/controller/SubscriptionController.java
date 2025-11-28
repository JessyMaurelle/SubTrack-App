package com.subtrack.backend.controller;

import com.subtrack.backend.model.Subscription;
import com.subtrack.backend.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;



import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin(origins = "*")
public class SubscriptionController {

  @Autowired
  private SubscriptionRepository subscriptionRepository;

  @GetMapping
  public List<Subscription> getSubscriptions() {
    return subscriptionRepository.findAll();
  }

  @GetMapping("/{id}")
  public Optional<Subscription> getSubscriptionById(@PathVariable Long id) {
    return subscriptionRepository.findById(id);
  }

  @PostMapping
  public  Subscription createSubscription(@Valid @RequestBody Subscription subscription) {
    return subscriptionRepository.save(subscription);
  }

  @PutMapping("/{id}")
  public Subscription updateSubscription(@PathVariable Long id, @Valid @RequestBody Subscription updatedSubscription) {
    return subscriptionRepository.findById(id).map(subscription -> {
      subscription.setName(updatedSubscription.getName());
      subscription.setCategory(updatedSubscription.getCategory());
      subscription.setCycle(updatedSubscription.getCycle());
      subscription.setPrice(updatedSubscription.getPrice());
      subscription.setCurrency(updatedSubscription.getCurrency());
      subscription.setNextChargeDate(updatedSubscription.getNextChargeDate());
      subscription.setStatus(updatedSubscription.getStatus());
      subscription.setLastPrice(updatedSubscription.getLastPrice());
      subscription.setOldPrice(updatedSubscription.getOldPrice());
      return subscriptionRepository.save(subscription);
    }).orElseGet(() -> {
      updatedSubscription.setId(id);
      return subscriptionRepository.save(updatedSubscription);
    });
  }

  @DeleteMapping("/{id}")
  public void deleteSubscription(@PathVariable Long id) {
    subscriptionRepository.deleteById(id);
  }
}
