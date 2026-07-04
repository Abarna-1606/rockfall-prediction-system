package backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "sensors")
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sensorName;
    private String type;
    private String status = "ACTIVE";

    @ManyToOne
    @JoinColumn(name = "zone_id")
    private Zone zone;
}